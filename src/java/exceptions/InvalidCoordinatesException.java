package exceptions;

/**
 *
 * @author Armaan Singh Klair
 */
public class InvalidCoordinatesException extends Exception{
    public InvalidCoordinatesException(){
        super("Invalid Coordinates");
    }
    
    public InvalidCoordinatesException(String message){
        super(message);
    }
}
