import { FC } from "react";
import { LayoutDiv } from "@styles/components/Layout";
import GlobalStyles from "@styles/global";

import { ILayout } from "@interfaces/components/Layout";

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <LayoutDiv>{children}</LayoutDiv>
    </>
  );
};

export default Layout;
