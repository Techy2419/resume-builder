import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { parseResumeFile } from '../../utils/resumeParser';
import { useResumeStore } from '../../store/resumeStore';

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportResumeModal: React.FC<ImportResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { updateData } = useResumeStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setSuccess(false);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const parsedData = await parseResumeFile(file);
      updateData(parsedData);
      setSuccess(true);

      setTimeout(() => {
        onClose();
        setFile(null);
        setSuccess(false);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to import resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Resume" size="md">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Upload your existing resume (PDF or DOCX) and our AI will automatically extract all the information.
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            id="resume-file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="resume-file"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-700 font-medium mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">PDF or DOCX (max. 10MB)</p>
          </label>

          {file && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
              <FileText className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>Resume imported successfully!</div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || loading}>
            {loading ? 'Importing...' : 'Import Resume'}
          </Button>
        </div>

        <div className="border-t pt-4 mt-4">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">Important Notes:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• AI-powered parsing works best with standard resume formats</li>
            <li>• You may need to review and adjust the imported data</li>
            <li>• Complex layouts or graphics may not parse perfectly</li>
            <li>• Your file is processed locally and securely</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
