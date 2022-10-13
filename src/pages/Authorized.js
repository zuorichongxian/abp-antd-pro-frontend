import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import globalService from '@/utils/GlobalServices';
import Navigate from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

if (globalService.sessionStore.getSessionStore().user == null) {
  history.push('/accounts/login');
}

export default ({ children }) => (
  <Authorized
    authority={children.props.route.authority}
    noMatch={<Navigate to="/accounts/login" />}
  >
    {children}
  </Authorized>
);
