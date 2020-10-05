import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function ImpostorIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <path d="M19.18 8.86h-.97a7.08 7.08 0 00-2.08-5 7.04 7.04 0 00-5.03-2.09c-2.73 0-5.17 1.54-6.38 3.96C2.68 6 1.09 7.74 1.09 9.86c0 1.86 1.22 3.42 2.9 3.97v7.4h2v-7.17h3.57c2.31 0 4.19-1.88 4.19-4.19s-1.88-4.19-4.19-4.19H7.12a5.116 5.116 0 017.6-.4 5.13 5.13 0 011.49 3.63v12.33h2V10.86h.97c.61 0 1.29.85 1.29 2.07v8.3h2v-8.3c0-2.28-1.45-4.07-3.29-4.07zm-7.44 1c0 1.2-.98 2.18-2.18 2.18H5.28c-1.2 0-2.18-.98-2.18-2.18s.98-2.18 2.18-2.18h4.28c1.21 0 2.18.98 2.18 2.18z" />
    </SvgIcon>
  );
}

export default ImpostorIcon;
