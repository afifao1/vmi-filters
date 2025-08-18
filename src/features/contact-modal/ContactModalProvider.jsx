import { createContext, useContext, useMemo, useState } from "react";
import ContactModal from "../../components/Modal/ContactModal";

const Ctx = createContext({ open: () => {}, close: () => {} });

export function useContactModal() {
  return useContext(Ctx);
}

export function ContactModalProvider({ children }) {
  const [opened, setOpened] = useState(false);

  const value = useMemo(
    () => ({
      open: () => setOpened(true),
      close: () => setOpened(false),
    }),
    []
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <ContactModal open={opened} onClose={() => setOpened(false)} />
    </Ctx.Provider>
  );
}
