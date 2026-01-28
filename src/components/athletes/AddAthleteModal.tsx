import { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AddAthleteModalProps {
  onClose: () => void;
}

export default function AddAthleteModal({ onClose }: AddAthleteModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [emailTags, setEmailTags] = useState<string[]>([]);
  const { addAthletes } = useData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if comma was entered
    if (value.includes(',')) {
      const emails = value.split(',').map(email => email.trim()).filter(email => email);
      if (emails.length > 0) {
        const validEmails = emails.filter(email => {
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        });
        setEmailTags(prev => [...prev, ...validEmails]);
        setEmailInput('');
      }
    } else {
      setEmailInput(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && emailInput.trim()) {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.trim())) {
        setEmailTags(prev => [...prev, emailInput.trim()]);
        setEmailInput('');
      }
    } else if (e.key === 'Backspace' && !emailInput && emailTags.length > 0) {
      setEmailTags(prev => prev.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setEmailTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (emailTags.length > 0) {
      addAthletes(emailTags, 'Online');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl">Add Athletes</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Athlete Email Addresses
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Enter email addresses separated by commas. Press Enter or add a comma to create a tag.
            </p>
            <div className="border border-gray-300 rounded-md p-2 min-h-[100px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
              <div className="flex flex-wrap gap-2 mb-2">
                {emailTags.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    <span>{email}</span>
                    <button
                      onClick={() => removeTag(index)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={emailInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full outline-none text-sm"
                placeholder={emailTags.length === 0 ? "athlete@example.com, another@example.com" : ""}
              />
            </div>
          </div>



          {emailTags.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">{emailTags.length}</span> athlete{emailTags.length !== 1 ? 's' : ''} will receive an invitation
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={emailTags.length === 0}
            className={`px-6 py-2.5 rounded-md transition-colors ${emailTags.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  );
}
