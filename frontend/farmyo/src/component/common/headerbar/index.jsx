

export default function Headerbar({title}){


    return (
        <>
            <div style={{height:50,backgroundColor:'#1B5E20'}} className="fixed top-0 z-10 w-full p-2 items-center">
                <h1 className="text-xl font-bold" style={{color:"white"}}>{title}</h1> 
            </div>
        </>
    );
}