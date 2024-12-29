import './Store.scss'
import Collection from '../Collection/Collection';

function Store({ title, subtitle, amount }: { title: string, subtitle: string, type?: string, amount?: number }) {

  return (
    <div className="store">
      <div>
        <span className="store_intro">{subtitle}</span>
        <h3 className="store_title">{title}</h3>
      </div>
      <Collection amount={amount} />

    </div >
  )
}

export default Store;
