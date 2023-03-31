import { Product } from '../components/Product';
import React, { useEffect, useRef, useState } from 'react';
import data from '../assets/data.json';

// interface IMainPageState {
//   inputValue: string;
//   items: ICardItem[];
// }

// interface ICardItem {
//   title: string;
// }

// export default class MainPage extends Component {
//   state: Readonly<IMainPageState> = {
//     inputValue: '',
//     items: [],
//   };
//   public render() {
//     return (
//       <div className="container mx-auto max-w-2xl pt-5">
//         <div>
//           <input
//             className="border rounded py-2 px-4 mb-2 w-full"
//             type="text"
//             value={this.state.inputValue}
//             onChange={(e) => this.handleChange(e)}
//             placeholder="Store search"
//           />
//         </div>
//         <div>
//           <ul>
//             {data.products.map((product) => (
//               <Product product={product} key={product.id} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }

//   private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState((prevState) => ({ ...prevState, inputValue: e.target.value }));
//   };

//   public componentDidMount(): void {
//     const savedValue = localStorage.getItem('input') ?? '';
//     this.setState((prevState) => ({ ...prevState, inputValue: savedValue }));
//   }

//   public componentWillUnmount(): void {
//     localStorage.setItem('input', this.state.inputValue);
//   }
// }

export const MainPage = () => {
  const [value, setValue] = useState<string>('');
  const inputValue = useRef('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('input') ?? '';
    setValue(savedValue);
    return function cleanup() {
      localStorage.setItem('input', inputValue.current);
    };
  }, []);

  useEffect(() => {
    inputValue.current = value;
  }, [value]);
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <div>
        <input
          className="border rounded py-2 px-4 mb-2 w-full"
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Store search"
        />
      </div>
      <div>
        <ul>
          {data.products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
