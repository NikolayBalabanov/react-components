import React, { Component } from 'react';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IProductProps {
  product: IProduct;
}

interface IProductState {
  isOpen: boolean;
}

export default class Product extends Component<IProductProps, IProductState> {
  constructor(props: IProductProps) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    const btnBgClassName = this.state.isOpen ? 'bg-yellow-400' : 'bg-blue-400';
    const btnClasses = ['py-2 px-4 boder rounded', btnBgClassName];
    return (
      <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
        <img className="w-3/6" src={this.props.product.thumbnail} alt={this.props.product.title} />
        <p>{this.props.product.title}</p>
        <p className="font-bold">{this.props.product.price}</p>
        <button
          className={btnClasses.join(' ')}
          onClick={() => {
            this.setOpen();
          }}
        >
          {this.state.isOpen ? 'Hide Details' : 'Show Details'}
        </button>
        {this.state.isOpen && (
          <div>
            <p>{this.props.product.description}</p>
            <p>
              Rate:<span style={{ fontWeight: 'bold' }}>{this.props.product.rating}</span>
            </p>
          </div>
        )}
      </div>
    );
  }

  private setOpen = () => {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  };
}
