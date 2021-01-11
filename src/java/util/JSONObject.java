/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.util.HashMap;

/**
 *
 * @author 839645
 */
public class JSONObject {
    private HashMap<String, String> keys;
    private String[] jsonString;
    
    public JSONObject(String jsonString){
        this.jsonString = jsonString.split("\"");
        this.keys = new HashMap<>();
        this.parse();
    }
    
    private void parse(){
        for(int i=1; i+2< this.jsonString.length; i += 4){
           keys.put(this.jsonString[i], this.jsonString[i+2]);  
        }
    }
    
    public String get(String key){
        return keys.get(key);
    }
    
    @Override
    public String toString(){
        StringBuilder result = new StringBuilder();
        for(int i=1; i+2< jsonString.length; i += 4){
            result.append(jsonString[i]+" = "+jsonString[i+2]+"; ");
        }
        return result.toString();
    }
}
