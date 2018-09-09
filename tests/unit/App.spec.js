import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import axios from '@/axios';
import App from '@/App.vue';
import sinon from 'sinon';

describe('App.vue', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('removes past shows', (done) => {
    const clock = sinon.useFakeTimers((new Date(2018, 9, 8, 18, 30)).getTime());

    const wrapper = shallowMount(App, {
      mocks: {
        $router: {
          currentRoute: {
            name: 'home',
          },
        },
      },
      stubs: ['router-link', 'font-awesome-icon', 'router-view'],
    });

    moxios.wait(() => {
      moxios.requests.mostRecent()
        .respondWith({
          status: 200,
          response: {
            shows: [
              {
                end: '2018-09-07 20:41:00',
                id: 'fff26a25-295a-4ba2-97d3-dfbbfc442688',
                movie: {
                  description: 'Sophie zachodzi w ciążę i poznaje historie z młodości swojej matki – szczególnie o czasie, w którym była ona w ciąży.',
                  duration: '1:56:00',
                  genre: 'Musical',
                  id: '1b911e6b-5e68-4c6f-b8f6-662bcede928f',
                  poster: 'http://pckisz.pl/pliki/Uploads/wrzesien2018/MAMMA MIA.jpg',
                  production: 'USA, 2018',
                  title: 'MAMMA MIA! HERE WE GO AGAIN',
                },
                start: '2018-09-07 18:45:00',
              },
            ],
            movies: [
              {
                description: 'Sophie zachodzi w ciążę i poznaje historie z młodości swojej matki – szczególnie o czasie, w którym była ona w ciąży.',
                duration: '1:56:00',
                genre: 'Musical',
                id: '1b911e6b-5e68-4c6f-b8f6-662bcede928f',
                poster: 'http://pckisz.pl/pliki/Uploads/wrzesien2018/MAMMA MIA.jpg',
                production: 'USA, 2018',
                title: 'MAMMA MIA! HERE WE GO AGAIN',
              },
            ],
          },
        })
        .then(() => {
          done();
        });
    });
  });
});
