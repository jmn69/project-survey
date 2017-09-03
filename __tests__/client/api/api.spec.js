import API, { authentication } from 'client/api';
import fetchMock from 'fetch-mock';
import 'fetch-everywhere';
import { server, port } from 'client/config';

describe('api', () => {

  it('should call authentication', async () => {

    const response = {
      status: 200,
      body: {
        success: true
      }
    }
    fetchMock.mock(
      `${server}/authentication`,
      response,
      { method: 'POST' }
    );

    const data = await API.authentication({});
    expect(data).toEqual({ success: true });
  });

  it('should call authenticate', async () => {

    const response = {
      status: 200,
      body: {
        authenticate: true
      }
    }
    fetchMock.mock(
      `${server}/authenticate`,
      response,
      { method: 'GET' }
    );

    const data = await API.authenticate();
    expect(data).toEqual({ authenticate: true });
  });

  it('should call logout', async () => {

    const response = {
      status: 200,
      body: {
        success: true
      }
    }
    fetchMock.mock(
      `${server}/logout`,
      response,
      { method: 'GET' }
    );

    const data = await API.logout();
    expect(data).toEqual({ success: true });
  });

});

