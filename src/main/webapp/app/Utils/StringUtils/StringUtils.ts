export class StringUtils {

    static captitalizeFirst(string: String) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

}
