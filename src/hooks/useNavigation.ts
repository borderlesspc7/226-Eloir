import { useNavigate, useLocation } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string) => {
    // Se estamos em uma rota aninhada (/menu/*) e o path é relativo,
    // navegamos para a rota pai + path
    if (location.pathname.startsWith("/menu") && !path.startsWith("/")) {
      navigate(`/menu/${path}`);
    } else {
      navigate(path);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const replace = (path: string) => {
    if (location.pathname.startsWith("/menu") && !path.startsWith("/")) {
      navigate(`/menu/${path}`, { replace: true });
    } else {
      navigate(path, { replace: true });
    }
  };

  return { goTo, goBack, replace };
}
