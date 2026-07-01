import { useNavigate } from "react-router-dom";
import { useTimeout } from "@/hooks/useTimeout";
import { useEffect } from "react";

export function SuccessView() {
  const navigate = useNavigate();

  const triggerRedirect = useTimeout(() =>  {
    navigate('/');
  }, 5000);

  useEffect(() => {
    triggerRedirect();
  }, [triggerRedirect]);

  triggerRedirect();

  return (
    <section>
      <h1>Transaction Secured</h1>
      <p>Your premium sneaker allocation is officially confirmed.</p>

      <button onClick={() => navigate('/')}>
        Return Storefront
      </button>
    </section>
  );
}
