import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useMemo,
} from "react";
import { initialFormState } from "@/common/initial-form-state";

interface AppState {
  currentScreen: number;
  selectedTemplate: string | null;
  formState: Form.FormState;
}

interface ContextType {
  currentScreen: number;
  setCurrentScreen: Dispatch<SetStateAction<number>>;
  selectedTemplate: string | null;
  setSelectedTemplate: Dispatch<SetStateAction<string | null>>;
  formState: Form.FormState;
  setFormState: Dispatch<SetStateAction<Form.FormState>>;
}

export const Context = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode;
}

const loadFromLocalStorage = (): AppState => {
  try {
    const stored = localStorage.getItem("appState");
    if (!stored) return defaultAppState;

    const parsed: AppState = JSON.parse(stored);

    return {
      ...parsed,
      formState: {
        ...parsed.formState,
        dateOfBirth: new Date(parsed.formState.dateOfBirth),
        workExperience: parsed.formState.workExperience.map((item) => ({
          ...item,
          dateFrom: item.dateFrom ? new Date(item.dateFrom) : null,
          dateTo: item.dateTo ? new Date(item.dateTo) : null,
        })),
        informationAboutRelatives:
          parsed.formState.informationAboutRelatives.map((item) => ({
            ...item,
            dateOfBirth: item.dateOfBirth ? new Date(item.dateOfBirth) : null,
          })),
      },
    };
  } catch (error) {
    console.error("Error load from localStorage:", error);
    return defaultAppState;
  }
};

const defaultAppState: AppState = {
  currentScreen: 1,
  selectedTemplate: null,
  formState: initialFormState,
};

export const Provider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo(
    () => ({
      currentScreen: state.currentScreen,
      setCurrentScreen: (value: SetStateAction<number>) =>
        setState((prev) => ({
          ...prev,
          currentScreen:
            typeof value === "function" ? value(prev.currentScreen) : value,
        })),

      selectedTemplate: state.selectedTemplate,
      setSelectedTemplate: (value: SetStateAction<string | null>) =>
        setState((prev) => ({
          ...prev,
          selectedTemplate:
            typeof value === "function" ? value(prev.selectedTemplate) : value,
        })),

      formState: state.formState,
      setFormState: (value: SetStateAction<Form.FormState>) =>
        setState((prev) => ({
          ...prev,
          formState:
            typeof value === "function" ? value(prev.formState) : value,
        })),
    }),
    [state]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
