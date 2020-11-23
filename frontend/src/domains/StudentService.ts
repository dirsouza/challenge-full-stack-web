import axios, { CancelTokenSource } from '@/support/http';
import { TStudentCreate, TStudentUpdate } from '@/support/types';

class StudentService {
  private service: typeof axios = axios;

  private baseUrl = `${process.env.VUE_APP_BASE_URL_API}/api/v1/students`;

  private cancelTS: CancelTokenSource | undefined;

  public findAll(search = '') {
    let { baseUrl } = this;

    if (search) {
      baseUrl = baseUrl.concat(`?search=${encodeURIComponent(search)}`);
    }

    this.cancelTS = this.cancelToken();

    return this.service.get(baseUrl, {
      cancelToken: this.cancelTS.token,
    });
  }

  public create(payload: TStudentCreate) {
    return this.service.post(this.baseUrl, payload);
  }

  public update(id: number, payload: TStudentUpdate) {
    let { baseUrl } = this;

    baseUrl = baseUrl.concat(`/${id}`);

    return this.service.patch(baseUrl, payload);
  }

  public delete(id: number) {
    let { baseUrl } = this;

    baseUrl = baseUrl.concat(`/${id}`);

    return this.service.delete(baseUrl);
  }

  private cancelToken(): CancelTokenSource {
    if (this.cancelTS) {
      this.cancelTS.cancel();
    }

    return this.service.CancelToken.source();
  }
}

export default new StudentService();
