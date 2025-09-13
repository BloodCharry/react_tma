import Modal from './Modal';
import Button from '../Button/Button';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Подтверждение',
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  destructive = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant={destructive ? 'destructive' : 'primary'}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;