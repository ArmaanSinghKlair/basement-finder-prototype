/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exceptions;

/**
 *
 * @author 839645
 */
public class EmptyFieldException extends Exception{
    public EmptyFieldException(){
        super("Field should not be left empty");
    }
    
    public EmptyFieldException(String message){
        super(message);
    }
}
