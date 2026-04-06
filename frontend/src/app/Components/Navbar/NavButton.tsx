import { cookies } from 'next/headers';
// import { useEffect, useState } from 'react';

import LoginBtn from './subcomponents/LoginBtn';
import SettingsBtn from './subcomponents/SettingsBtn';

export default async function NavButton() {
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   setToken(storedToken);
  // }, []);

  const cookieStorage = await cookies();
  const token = cookieStorage.get('token');

  return <>{token ? <SettingsBtn /> : <LoginBtn />}</>;
}
