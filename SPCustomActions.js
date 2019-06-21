<script language="javascript" type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>  
<script language="javascript" type="text/javascript">  
    $(document).ready(function() {  
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', Main);  
    });  
    
 function Main() {   
 		//DeleteCustomUserAction("Password");	
        //AddCustomUserAction("Password");
        DeleteCustomUserAction("Change your password");
        AddCustomUserAction("Change your password");       
    }
    function AddCustomUserAction(title) {  
        //Get the client context and web object   
        var clientContext = new SP.ClientContext();  
        var oWeb = clientContext.get_web();  
        //Get the custom user action collection and add the new custom action to it   
        var collUserCustomAction = oWeb.get_userCustomActions();  
        var oUserCustomAction = collUserCustomAction.add();  
        //Specify the location and properties for the new custom action   
        oUserCustomAction.set_location('Microsoft.SharePoint.StandardMenu');  
        oUserCustomAction.set_sequence(101);  
        oUserCustomAction.set_group('SiteActions');  
        oUserCustomAction.set_title(title); 
        if(title != "Password")
        { 
        //Replace with your own url
        oUserCustomAction.set_url("https://google.com");  
        }
        oUserCustomAction.update();  
        //Load the client context and execute the batch   
        clientContext.load(collUserCustomAction);  
        clientContext.executeQueryAsync(QuerySuccess, QueryFailure);  
    }  
    function DeleteCustomUserAction(title) {
		var clientContext = new SP.ClientContext.get_current();
		var web = clientContext.get_web();        
		var collUserCustomAction = web.get_userCustomActions();
		clientContext.load(collUserCustomAction);
		clientContext.executeQueryAsync(function () {
		var item = collUserCustomAction.getEnumerator();
		while (item.moveNext()) {
		var currAction = item.get_current();
		if (currAction.get_title() === title) {
		currAction.deleteObject();
		clientContext.load(currAction);
		clientContext.executeQueryAsync(function () {
		console.clear();		
		console.log("Site action link deleted");
		}, QueryFailure);
		}
		}
		});
		} 
  function QuerySuccess() {  
        console.log("New Custom User Action has been added to site settings");  
    } 
    function QueryFailure() {  
        console.log(args.get_message());  
    }  
    
    </script>  
