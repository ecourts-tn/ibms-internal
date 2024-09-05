export const CreateMarkup = (content) => {
    return {__html: content}
}

export const RequiredField = () => {
    return(
        <span className="text-danger ml-1">*</span>
    )
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
};

export const formatDBDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
};