export interface IButton {
    id?: string;
    type?: any;
    onClick: () => void;
    mode?: 'primary' | 'secondary';
    disabled: boolean;
}