import { RestContext, rest } from 'msw';
import { mockedActor, mockedDetailMovie } from './mockedData';
// https://api.themoviedb.org/3/movie/${query}?api_key=${import.meta.env.VITE_APP_APY_KEY}

export const handlers = [
  rest.get(`https://api.themoviedb.org/3/movie/popular`, (req, res, ctx: RestContext) => {
    if (req.url.searchParams.get('api_key'))
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              adult: false,
              backdrop_path: '/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg',
              genre_ids: [18, 28],
              id: 677179,
              original_language: 'en',
              original_title: 'Creed III',
              overview:
                'After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien — a fighter who has nothing to lose.',
              popularity: 9575.225,
              poster_path: '/vJU3rXSP9hwUuLeq8IpfsJShLOk.jpg',
              release_date: '2023-03-01',
              title: 'Creed III',
              video: false,
              vote_average: 7.3,
              vote_count: 807,
            },
            {
              adult: false,
              backdrop_path: '/ovM06PdF3M8wvKb06i4sjW3xoww.jpg',
              genre_ids: [878, 12, 28],
              id: 76600,
              original_language: 'en',
              original_title: 'Avatar: The Way of Water',
              overview:
                'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
              popularity: 8358.734,
              poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
              release_date: '2022-12-14',
              title: 'Avatar: The Way of Water',
              video: false,
              vote_average: 7.8,
              vote_count: 6748,
            },
          ],
          total_pages: 1,
        })
      );
  }),
  rest.get(`https://api.themoviedb.org/3/movie/677179`, (req, res, ctx: RestContext) => {
    if (req.url.searchParams.get('api_key'))
      return res(ctx.status(200), ctx.json(mockedDetailMovie));
  }),
  rest.get(`https://api.themoviedb.org/3/movie/677179/credits`, (req, res, ctx: RestContext) => {
    if (req.url.searchParams.get('api_key'))
      return res(ctx.status(200), ctx.json({ cast: [mockedActor] }));
  }),
  rest.get(`https://api.themoviedb.org/3/movie/677179/videos`, (req, res, ctx: RestContext) => {
    if (req.url.searchParams.get('api_key'))
      return res(
        ctx.status(200),
        ctx.json({ results: [{ key: 'https://www.youtube.com/watch?v=2Ai4bgELi24' }] })
      );
  }),
];
