<%
    'data to be filled
   dim emailAdress
    dim experimentCode
    emailAdress = ""
    experimentCode ="x128c"
    domain = "deusto.es"

    'program variables
    dim mail
    dim date
    dim tx 
    dim iipp
    dim location
    date = Now
    
    tx = Request.ServerVariables("HTTP_REFERER") 
    iipp = request.ServerVariables("HTTP_X_FORWARDED_FOR")
    if iipp = "" then iipp = Request.ServerVariables("REMOTE_ADDR")
    
    'if Ucase(tx) = Ucase("http://www.labpsico.deusto.es/" & experimentCode & "/" & experimentCode & ".htm") then
        referer = inStr(Ucase(tx), Ucase(domain))
    if referer <> 0 then
        set mail = CreateObject("CDONTS.NewMail")
            mail.From = emailAdress
        mail.To = emailAdress
        mail.Subject = experimentCode

        tx = iipp
        if left(tx,9) = "10.100.91" then
            location = "A091"
        elseif left(tx,9) = "10.100.92" then
            location = "A092"
        elseif left(tx,9) = "10.100.93" then
            location = "A093"
        elseif left(tx,9) = "10.100.94" then
            location = "A094"
        elseif left(tx,11) = "192.168.128" then
          if right(tx,3) = "177" then
            location = "Cabinas-PC6"
          elseif right(tx,3) = "178" then
            location = "Cabinas-PC11"
          elseif right(tx,3) = "179" then
            location = "Cabinas-PC2"
          elseif right(tx,3) = "180" then
            location = "Cabinas-PC4"
          elseif right(tx,3) = "181" then
            location = "Cabinas-PC9"
          elseif right(tx,3) = "182" then
            location = "Cabinas-PC8"
          elseif right(tx,3) = "183" then
            location = "Cabinas-PC7"
          elseif right(tx,3) = "184" then
            location = "Cabinas-PC5"
          elseif right(tx,3) = "185" then
            location = "Cabinas-PC10"
          elseif right(tx,3) = "186" then
            location = "Cabinas-PC3"
          elseif right(tx,3) = "187" then
            location = "Cabinas-PC1"
          end if
        elseif left(tx,14) = "130.206.138.233" then
            location = "Proxy Deusto"
        elseif left(tx,14) = "130.206.137.20" then
            if right(tx,1) = "1" or  right(tx,1) = "2" or right(tx,1) = "3" or right(tx,1) = "4" or right(tx,1) = "5" then
                location = "Laboratorio"
            else
                location = "Internet"   
            end if
        else
            location = "Internet"
        end if

        tx = experimentCode & "," & location & "," & request("data")
        mail.Body = tx
        mail.Send
        Set mail = Nothing
    end if  
%>
