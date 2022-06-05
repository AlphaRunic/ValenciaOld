export default function GetTweenPos<T = UDim2>(instance: Instance): { Open: T, Closed: T } {
    return {
        Open: <T>instance.GetAttribute("OpenPos"),
        Closed: <T>instance.GetAttribute("ClosedPos")
    }
}