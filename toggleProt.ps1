# check args
if ($args.Count -ne 1) {
    Write-Host "Use: .\TogglePort5173.ps1 [open|close]"
    exit 1
}
$action = $args[0].ToLower()
$ruleName = "Port 5173"

# OPEN PORT
function Open-Port5173 {
    # CHECK AVAILABLE RULE
    $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
    if ($existingRule) {
        Write-Host "Port 5173 is open."
        return
    }
    # CREATE NEW RULE INPUT CONNECTION
    New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
    Write-Host "Port 5173 open for input connections."
}

# CLOSE PORT
function Close-Port5173 {
    # CHECK AVAILABLE RULE
    $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
    if (-not $existingRule) {
        Write-Host "Port 5173 not open."
        return
    }
    # DELETE RULE
    Remove-NetFirewallRule -DisplayName $ruleName
    Write-Host "Port 5173 close."
}

# CHECK STATUS PORT
function Check-PortStatus {
    $listener = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($listener) {
        Write-Host "[✓] Port 5173 now LISTENING."
    } else {
        Write-Host "[✗] Port 5173 now NOT listening (closed or not use)."
    }
}

# EXECUTE ACTION
switch ($action) {
    "open"  { Open-Port5173 }
    "close" { Close-Port5173 }
    default {
        Write-Host "Bad args"
        exit 1
    }
}

# SHOW FINAL STATUS
Write-Host "`nCurrent status port 5173:"
Check-PortStatus


#тут что нибудь напишу такое страшное и странное и закоммичу в мастер
#каков негодник!