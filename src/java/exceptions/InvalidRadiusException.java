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
public class InvalidRadiusException extends Exception{
    public InvalidRadiusException(){
        super("Invalid radius");
    }
    
    public InvalidRadiusException(String str){
        super(str);
    }
}
