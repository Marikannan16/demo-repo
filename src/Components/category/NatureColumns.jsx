import ActionMenu from "../../Components/ActionMenu";
const NatureColumns = [
    {
        name: 'S NO',
        selector: row => row.sno,
        sortable: true,
        grow:1
    },
    {
        name: 'Category',
        selector: row => row.category,
        sortable: true,
        
        
    },
    {
        name: 'Actions', 
        cell:(row)=><ActionMenu row={row}/>,
        ignoreClick:true,  
        right:true
        
             
    }

];

export default NatureColumns