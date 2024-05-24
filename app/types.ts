export type ButtonProps = {
  children: React.ReactNode;
  onClick: (value: string) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  value: string;
};
export type Action =
  | { type: "ADD_DIGIT"; payload: string }
  | { type: "CHOOSE_OPERATION"; payload: string }
  | { type: "CLEAR" }
  | { type: "DELETE_DIGIT" }
  | { type: "EVALUATE" };
