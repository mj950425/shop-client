export interface SectionProps {
    title: string;
    loading: boolean;
    buttonText: string;
    onClick: () => void;
    children: React.ReactNode;
}