import './CollectionPage.scss'
import Questions from '../../components/App/Questions/Questions';
import { useNavigate, useParams } from 'react-router-dom';
import Collection from '../../components/App/Collection/Collection';

function CollectionPage() {
  const { brand } = useParams<string>();
  const navigate = useNavigate();

  if (!brand) {
    navigate('/');
    return null;
  }


  return (
    <div className="home">
      <Collection brand={brand} />
      <Questions />
    </div>
  )
}

export default CollectionPage;
