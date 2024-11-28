import ActionMenu from '../../Components/ActionMenu';
import { HiDotsVertical } from "react-icons/hi";    
const columns = [
    {
        name: 'S NO',
        selector: row => row.sno,
        sortable: true
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
        selector: row => row.actions,
        right:true,
        grow:1
    }

];

export default columns