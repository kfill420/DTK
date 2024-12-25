
import './Order.scss'

function Order() {
  return (
    <div className="order">
      <h2 className="order_title">Commandes</h2>
      <div className="order_infos">
        <span className="order_infos_name">Aucune commande pour l'instant</span>
        <span className="order_infos_value">Accèdez à la boutique pour passer une commande</span>
      </div>
    </div>
  )
}

export default Order;
