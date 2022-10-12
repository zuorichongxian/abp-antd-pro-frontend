import Exception from '@/components/Exception';
import React from 'react';
import { formatMessage,Link } from 'umi';

export default () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);
