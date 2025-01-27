export interface ModalAddAddressProps {
  isOpen: boolean;
  formData: CheckProfileAddressI;
  modalAddressIsEdit: boolean;
  countries: { code: string; name: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handleDelete: () => void;
  handleReset: (e: React.FormEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface ModalInfosProps {
  isOpen: boolean;
  formData: CheckProfileAddressI;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  handleReset: (e: React.FormEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
}