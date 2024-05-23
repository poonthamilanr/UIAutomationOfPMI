#Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

#taskkill /F /IM chromedriver.exe

# !IMPORTANT ::: Modify the parameters before executing. #

$baseFolder = "D:\Cert\ProdMonitoring\Binary"
$resultsFolder = "..\TestResults"
$logFile = "TestLog.xml"
$specRunner = "SpecFlowPlusRunner\net45\SpecRun.exe"
$channelSite = "https://pmiorg0.sharepoint.com/sites/CertificationAppRedesign"
$target = "/Shared Documents/Production Monitoring"
$hook = "https://outlook.office.com/webhook/d4edc795-95e0-4819-b6ee-cc194341457a@efa022f4-2c02-46d8-b614-1b43989d652f/IncomingWebhook/006f5a7102974af8b74121630ae68af6/3ec45282-941f-482e-a180-0fb101443cff"

function SendTeamsNotification($Path) {
    [XML]$testLogContent = Get-Content $Path
    $resultToSend = New-Object -TypeName System.Text.StringBuilder
    
    foreach ($testResult in $testLogContent.TestResults.TestResult) {
        $index = 1
        $err = ""
        $screenshot = ""
        $resultToSend.Clear()
        $resultToSend.Append("Environment : **PRODUCTION**") > $null
        $resultToSend.Append("<br>")> $null
        $resultToSend.Append("Scenario : **{0}**" -f $testResult.Title.Substring(0, $testResult.Title.LastIndexOf(','))) > $null
        $resultToSend.Append("<br>")> $null
        $resultToSend.Append("Status : **{0}**" -f $testResult.Status)> $null
        $resultToSend.Append("<br>")> $null
        $resultToSend.Append("Duration : **{0}**" -f $testResult.ExecutionTime)> $null
        $resultToSend.Append("<br>")> $null

        foreach ($stepInfo in $testResult.Steps.Step) {
        
            $stepDef = $stepInfo.BusinessMessage.Replace("`n", "<br>")
            $resultToSend.Append("Step  $index : ")> $null
            $resultToSend.Append($stepDef) > $null
            $resultToSend.Append(" | **{0}**" -f $stepInfo.Status) > $null
            $resultToSend.Append(" | **{0}**" -f $stepInfo.Duration) > $null
            $resultToSend.Append("<br>")> $null
            if ($null -ne $stepInfo.ErrorMessage -and "" -ne $stepInfo.ErrorMessage) {
                $err = $stepInfo.ErrorMessage
                $screenshot = "{0}{1}/{2}" -f $channelSite, $target, $stepInfo.Screenshot
                $path = "{0}\{1}\{2}" -f $baseFolder, $resultsFolder, $stepInfo.Screenshot
                Connect-PnPOnline -Url $channelSite
                Add-PnPFile -Path $path -Folder $target -ErrorAction SilentlyContinue > $null
                Disconnect-PnPOnline
            }

            $index = $index + 1
        }
        if ($err -ne '') {
            $resultToSend.Append("**Error** : {0}" -f $err)> $null
            $resultToSend.Append("<br>")> $null
            $resultToSend.Append("**Screenshot** : {0}" -f $screenshot)> $null
        }
        $body = @{text = $resultToSend.ToString() } | ConvertTo-Json -Compress 
        
        Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body $body -Uri $hook
    }
}

$commandLine = "{0}\{1} buildserverrun ProductionMonitoring.srprofile --baseFolder {0} --log test_{2}.log" -f $baseFolder, $specRunner, (Get-Date).ToString("yyyy_MM_dd_HH_mm")

Invoke-Expression $commandLine | Out-Null

SendTeamsNotification "$baseFolder\$resultsFolder\$logFile"