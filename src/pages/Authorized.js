import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import globalService from '@/utils/GlobalServices';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

if (globalService.sessionStore.getSessionStore().user == null) {
  history.push('/accounts/login');
}

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/accounts/login" />}>
    {children}
  </Authorized>
);
