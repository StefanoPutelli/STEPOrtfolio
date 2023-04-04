export default function Overlay(props){
    if(props.show) return null;
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-4 border-white rounded-full animate-spin"></div>
            </div>
        </div>
    )
}