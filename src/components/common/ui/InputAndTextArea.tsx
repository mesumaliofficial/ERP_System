type InputFieldProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | string;
  className?: string;
};

export const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  readOnly = false,
  onChange,
  value = "",
  className = "",
}: InputFieldProps) => (
  <div>
    {label && (
      <label
        htmlFor={id}
        className="block text-[15px] font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
    )}
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
      value={value}
      className={`w-full text-[15px] bg-[#f5f5f5] px-4 py-2 border border-gray-200 focus:ring-1 focus:ring-[#1E90FF] focus:outline-none ${className}`}
    />
  </div>
);

type TextAreaFieldProps = {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextAreaField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}: TextAreaFieldProps) => (
  <div>
    {label && (
      <label
        htmlFor={id}
        className="block text-base font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
    )}
    <textarea
      id={id}
      name={id}
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[#f5f5f5] rounded px-4 py-3 border border-gray-200 focus:ring-1 focus:ring-[#1E90FF] focus:outline-none resize-none"
    />
  </div>
);