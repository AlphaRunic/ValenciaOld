export default function FormatInt(x: number): string {
    const tuple = tostring(x).find("([-]?)(%d+)([.]?%d*)");
    const minus = tuple[2] as string;
    let int = tuple[3] as string;
    const fraction = tuple[4] as string;

    int = int.reverse().gsub("(%d%d%d)", "%1")[0];
    return minus + int.reverse().gsub("^,", "")[0] + fraction;
}