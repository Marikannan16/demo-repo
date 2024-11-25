import Actions from "../ActionMenu";
import FileMenu from "../CompanyCompliance/FileMenu";

export const Columns = [
    {
        name: 'Sno',
        selector: (row) => row.sno,
        sortable: true,
        width: '100px',
    },
    {
        name: 'Nature of activity',
        selector: (row) => row.natureOfActivity,
        sortable: true,
    },
    {
        name: 'Activity',
        selector: (row) => row.activity,
        sortable: true,
    },
    {
        name: <p className="text-center">Name of the form</p>,
        selector: (row) => row.nameOfForm,
        sortable: true,
    },
    {
        name: <p className="text-center">Applicable Law</p> ,
        selector: (row) => row.applicationLaw,
        sortable: true,
    },
    {
        name: <p className="text-center">Type of act</p>,
        selector: (row) => row.typeOfAct,
        sortable: true,
    },
    {
        name: <p className="text-center">Actual filling frequency</p>,
        selector: (row) => row.actualFillingFrequency,
        sortable: true,
    },
    {
        name: <p className="text-center">Last filled date</p>,
        selector: (row) => row.lastFilledDate,
        sortable: true,
    },
    {
        name: <p className="text-center">Filling frequency</p>,
        selector: (row) => row.fillingFrequency,
        sortable: true,
    },
    {
        name: 'Doc',
        // selector:(row)=>row.document,
        cell: (row) =><FileMenu data={row.document} />,
        width:'150px'

    },
    {
        name: 'Actions',
        cell: (row) => <Actions />,
        ignoreClick: true,
        allowOverflow: true,
        width: '100px',
    },
]
