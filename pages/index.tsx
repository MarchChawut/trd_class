import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../state/store";
import LoginPage from "./login_component";

const Index = () => (
  <>
    <Head>
      <title>{process.env.RESOURCE_NAME}</title>
    </Head>
    <Provider store={store}>
      <HomepageContent />
    </Provider>
  </>
);

const HomepageContent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage/>
    </div>
  );
};

export default Index;
