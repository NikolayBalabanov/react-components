import { act, render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';

describe('Main Page:', () => {
  beforeAll(() =>
    act(() =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
    )
  );
  it('Contains input', async () => {
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Search a movie...')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Search a movie...');
    const text = 'someText';
    await user.type(input, text);
    expect(input).toHaveValue(text);
  });
});

// describe('Main Page with data:', () => {
//   beforeAll(() =>
//     act(() =>
//       render(
//         <Provider store={store}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </Provider>
//       )
//     )
//   );

// it('Try to find movie card after loading...', async () => {
//   expect(await screen.findByText('Creed III')).toBeInTheDocument();
//   expect(await screen.findByText('7.3')).toBeInTheDocument();
//   expect(await screen.findByText(/After dominating the boxing world/)).toBeInTheDocument();
// });
// it('Empty result after loading...', async () => {
//   const data = {
//     results: [],
//   };

//   (axios.get as jest.MockedFunction<typeof axios.get<IMovie[]>>).mockResolvedValue({
//     data,
//   } as unknown as AxiosResponse<IMovie[]>);

//   const { findByText } = render(
//     <MemoryRouter initialEntries={['/']}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(
//     await findByText('Hmm... Result is empty. Try to serach something else!')
//   ).toBeInTheDocument();
// });
// });

// describe('Search form with data:', () => {
//   it('Try to search Creed III movie', async () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <MainPage />
//       </MemoryRouter>
//     );
//     const searchInput = screen.getByPlaceholderText('Search a movie...');
//     expect(searchInput).toBeInTheDocument();
//     const submitBtn = screen.getByText('Submit');
//     expect(submitBtn).toBeInTheDocument();
//     const user = userEvent.setup();
//     await user.type(searchInput, 'Creed III');
//     expect(searchInput).toHaveValue('Creed III');
//     const clearBtn = screen.findByTestId('clear');
//     expect(await clearBtn).toBeInTheDocument();
//     await user.click(await clearBtn);
//     expect(searchInput).toHaveValue('');
//     await user.type(searchInput, 'Creed III');
//     await user.click(submitBtn);
//     const data = {
//       results: [
//         {
//           adult: false,
//           backdrop_path: '/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg',
//           genre_ids: [18, 28],
//           id: 677179,
//           original_language: 'en',
//           original_title: 'Creed III',
//           overview:
//             'After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien — a fighter who has nothing to lose.',
//           popularity: 9575.225,
//           poster_path: '/vJU3rXSP9hwUuLeq8IpfsJShLOk.jpg',
//           release_date: '2023-03-01',
//           title: 'Creed III',
//           video: false,
//           vote_average: 7.3,
//           vote_count: 807,
//         },
//       ],
//     };
//     (axios.get as jest.MockedFunction<typeof axios.get<IMovie[]>>).mockResolvedValue({
//       data,
//     } as unknown as AxiosResponse<IMovie[]>);

//     const { findByText } = render(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(await findByText('Creed III')).toBeInTheDocument();
//     expect(
//       await findByText('Hmm... Result is empty. Try to serach something else!')
//     ).toBeInTheDocument();
//   });
//   it('Try to check empty search result...', async () => {
//     const data = {
//       results: [],
//     };

//     (axios.get as jest.MockedFunction<typeof axios.get<IMovie[]>>).mockResolvedValue({
//       data,
//     } as unknown as AxiosResponse<IMovie[]>);

//     const { findByText } = render(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(
//       await findByText('Hmm... Result is empty. Try to serach something else!')
//     ).toBeInTheDocument();
//   });
// });
