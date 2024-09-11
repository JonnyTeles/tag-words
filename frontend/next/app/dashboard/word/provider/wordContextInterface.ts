export interface CustomWordContextType {
    isWordLoading: boolean;
    word: any;
    tags: any;
    handleDeleteTag: (relationId: string) => void;
    handleBackDashboard: () => void;
    relationMutation: any;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}