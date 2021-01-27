import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Cart from './Components/Cart';
import Login from './Components/Login';
import CoinsSearch from './Components/CoinsSearch';

import Context from './Context';

const URL_COINGECKO = "https://api.coingecko.com/api/v3/coins/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      coins: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    await axios.get(URL_COINGECKO +'markets?vs_currency=brl&order=market_cap_desc&page=1&sparkline=false')
                  .then(coins => {
                                this.setState({coins: coins.data});
                                
                                })
                  .catch(error => console.log(error));
                  
    user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};

    this.setState({ user, cart });
  }

  /* //adding a Product

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };
 */

  // add to cart

  addToCart = cartItem => {
    let cart = this.state.cart;
    if ( Object.keys(this.state.cart).length  >= 3) {
      // cart[cartItem.id].amount += cartItem.amount;
      alert("Just only 3 coins to compair");

    }else{
      cart[cartItem.id] = cartItem;
    }

    /* if (cart[cartItem.id].amount > cart[cartItem.id].coin.stock){
      cart[cartItem.id].amount = cart[cartItem.id].coin.stock;
    } */
    localStorage.setItem("cart", JSON.stringify(cart));
  this.setState({cart});
};
  
removeFromCart = cartItem => {
  let cart = this.state.cart;
  delete cart[cartItem];
  localStorage.setItem("cart", JSON.stringify(cart));
  this.setState({ cart });
};

clearCart = () => {
  let cart = {};
  localStorage.removeItem("cart");
  this.setState({ cart });
};


checkout = () => {
  if (!this.state.user) {
    this.routerRef.current.history.push("/login");
    return;
  }

  const cart = this.state.cart;

  /* const coins = this.state.coins.map(p => {
    if (cart[p.name]) {
      p.stock = p.stock - cart[p.name].amount;
      
      axios.put(
        `http://localhost:3001/products/${p.id}`,
        { ...p },
      )
    
    }
    return p;
  });

  this.setState({ coins }); */
  this.clearCart();
};


  login = async (email, password) => {
    const res = await axios.post(
      'http://localhost:3001/login',
      {email, password },
    ).catch((res) => {
      return { status: 401, message: 'Não Autorizado'}
    })

    if(res.status === 200 ) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
    this.routerRef.current.history.push("/login");

  };

  render(){
    return (
      <Context.Provider
          value={{
            ...this.state,
            removeFromCart: this.removeFromCart,
            addToCart: this.addToCart,
            login: this.login,
            clearCart: this.clearCart,
            checkout: this.checkout
          }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 has-text-success-dark">Rock's Trader</b>
              <label
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/coins-search" className="navbar-item">
                  Coins
                </Link>
                
                <Link to="/cart" className="navbar-item">
                  Coins Selected
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    { Object.keys(this.state.cart).length }
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/coins-search" component={CoinsSearch} />
            </Switch>
          </div>
        </Router>


      </Context.Provider>
    );
  }
}

