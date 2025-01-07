import './CollectionPage.scss'
import { useNavigate, useParams } from 'react-router-dom';
import Collection from '../../components/App/Collection/Collection';
import ToggleSwitch from "../../components/App/ToggleSwitch/ToggleSwitch";
import { VscSettings } from "react-icons/vsc";
import ModalCollectionFilter from "../../components/Modal/ModalCollectionFilter/ModalCollectionFilter";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ProductI } from "../../@types/product";
import { actionCheckProduct } from "../../store/thunks/checkProduct";
import { setIsOpen, toggleIsOpen } from "../../store/reducer/modal";

function CollectionPage() {
  const { brand } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [brandList, setBrandList] = useState<ProductI[]>([]);
  const [filteredList, setFilteredList] = useState<ProductI[]>([]);
  const list = useAppSelector((state) => state.product.list);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(100);
  const [inputMinPrice, setInputMinPrice] = useState(0);
  const [inputMaxPrice, setInputMaxPrice] = useState(100);
  const [filtered, setFiltered] = useState(false);

  const modalCollectionFilterIsOpen = useAppSelector((state) => state.ModalMenu.modalCollectionFilterIsOpen);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(actionCheckProduct());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    switch (brand) {
      case 'iPhone':
        setBrandList(list.filter((product) => product.brand === 'iPhone'));
        setFiltered(false);
        break;
      case 'Samsung':
        setBrandList(list.filter((product) => product.brand === 'Samsung'));
        setFiltered(false);
        break;
    }
    setFilteredList(brandList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, list, brandList.length]);

  useEffect(() => {
    if (filtered) {
      const brandListFiltered = brandList.filter((product) => product.Prices.some((price) => +price.price >= selectedMinPrice && +price.price <= selectedMaxPrice));
      setFilteredList(brandListFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, selectedMinPrice, selectedMaxPrice]);

  useEffect(() => {
    const initGlobalPrice = () => {
      let priceList;
      if (brandList.length === 0)
        priceList = list.map((product) => product.Prices);
      else priceList = brandList.map((product) => product.Prices);

      const minGlobalPrice = priceList.map((product) => {
        const priceList = product.map((price) => +price.price);
        let price = priceList[0];
        priceList.forEach(product => {
          if (product < price) {
            price = product;
          }
        });
        if (product) return price;
      });

      const maxGlobalPrice = priceList.map((product) => {
        const priceList = product.map((price) => +price.price);
        let price = priceList[0];
        priceList.forEach(product => {
          if (product > price) {
            price = product;
          }
        });

        if (product) return price;
      });

      if (maxGlobalPrice.length === 0 || minGlobalPrice.length === 0) return;

      setInputMinPrice(Math.min(...minGlobalPrice.filter((price): price is number => price !== undefined)))
      setInputMaxPrice(Math.max(...maxGlobalPrice.filter((price): price is number => price !== undefined)));
      setMinPrice(Math.min(...minGlobalPrice.filter((price): price is number => price !== undefined)));
      setMaxPrice(Math.max(...maxGlobalPrice.filter((price): price is number => price !== undefined)));

    }
    if (!filtered)
      initGlobalPrice();
  }, [brandList, list]);

  if (!brand) {
    navigate('/');
    return null;
  }

  const acceptFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFiltered(true);
    setSelectedMinPrice(inputMinPrice);
    setSelectedMaxPrice(inputMaxPrice);
    dispatch(setIsOpen({ modal: 'modalCollectionFilterIsOpen', value: false }));
  };

  const handleOpen = () => {
    dispatch(toggleIsOpen('modalCollectionFilterIsOpen'));
  };

  const handleModifyPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'min') {
      if (parseInt(e.target.value) > inputMaxPrice)
        setInputMinPrice(inputMaxPrice - 10);
      else
        setInputMinPrice(parseInt(e.target.value));
    }
    if (e.target.id === 'max') {
      if (parseInt(e.target.value) < inputMinPrice)
        setInputMaxPrice(inputMinPrice + 10);
      else
        setInputMaxPrice(parseInt(e.target.value));
    }
  };

  return (
    <div className="collectionPage">
      <h3 className="collectionPage_title">{brand}</h3>
      <div className="collectionPage_container">
        <div className="collectionPage_filter">
          <h3 className="collectionPage_filter_title">Filtres</h3>
          <div className="collectionPage_filter_available">
            <span className="collectionPage_filter_available_text">En stock uniquement</span>
            <ToggleSwitch />
          </div>
        </div>
        <Collection list={filteredList} />
      </div>

      <button className="collectionPage_filterButton" onClick={handleOpen}><VscSettings size={20} />Filtrer et trier</button>
      <ModalCollectionFilter isOpen={modalCollectionFilterIsOpen} acceptFunction={acceptFunction} cancelFunction={handleOpen} min={minPrice} max={maxPrice} modifyFunction={handleModifyPrice} minValue={inputMinPrice} maxValue={inputMaxPrice} />
    </div>
  )
}

export default CollectionPage;
