<#
.SYNOPSIS
    Manages Windows Firewall rules for port 5173 (opens or closes the port).
.DESCRIPTION
    This script creates or removes a Windows Firewall rule for TCP port 5173 based on the provided argument.
    Valid arguments: "open" or "close".
.PARAMETER Action
    The action to perform - either "open" or "close" port 5173
.EXAMPLE
    .\ManagePort5173.ps1 open
    Opens port 5173 in Windows Firewall
.EXAMPLE
    .\ManagePort5173.ps1 close
    Closes port 5173 in Windows Firewall
#>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("open", "close")]
    [string]$Action
)

# Rule configuration
$ruleName = "Port 5173 Custom Rule"
$portNumber = 5173
$protocol = "TCP"

function Test-IsAdmin {
    # Check if script is running with administrator privileges
    $currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-PortOpen {
    # Check if the port is currently open in firewall
    $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
    if ($existingRule) {
        $portFilter = Get-NetFirewallPortFilter -AssociatedNetFirewallRule $existingRule
        if ($portFilter.LocalPort -eq $portNumber -and $portFilter.Protocol -eq $protocol -and $existingRule.Enabled -eq "True") {
            return $true
        }
    }
    return $false
}

function Write-Result {
    param([bool]$success, [string]$message)
    
    if ($success) {
        Write-Host "SUCCESS: $message" -ForegroundColor Green
    } else {
        Write-Host "ERROR: $message" -ForegroundColor Red
    }
}

# Main script execution
try {
    # Verify admin privileges
    if (-not (Test-IsAdmin)) {
        throw "This script requires administrator privileges. Please run PowerShell as Administrator."
    }

    # Execute the requested action
    switch ($Action) {
        "open" {
            # Check if port is already open
            if (Test-PortOpen) {
                Write-Result $true "Port $portNumber is already open in firewall."
                exit 0
            }

            # Create or enable the rule
            $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
            
            if ($existingRule) {
                # Rule exists but might be disabled or misconfigured
                Set-NetFirewallRule -DisplayName $ruleName -Enabled True
                Set-NetFirewallPortFilter -DisplayName $ruleName -LocalPort $portNumber -Protocol $protocol
                Write-Host "Updated existing firewall rule for port $portNumber"
            } else {
                # Create new rule
                New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -LocalPort $portNumber -Protocol $protocol -Action Allow
                Write-Host "Created new firewall rule for port $portNumber"
            }

            # Verify the port was opened
            if (Test-PortOpen) {
                Write-Result $true "Port $portNumber has been successfully opened in firewall."
            } else {
                Write-Result $false "Failed to verify that port $portNumber is open."
            }
        }
        
        "close" {
            # Check if port is already closed
            if (-not (Test-PortOpen)) {
                Write-Result $true "Port $portNumber is already closed in firewall."
                exit 0
            }

            # Disable or remove the rule
            $existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
            
            if ($existingRule) {
                # Remove the rule completely
                Remove-NetFirewallRule -DisplayName $ruleName
                Write-Host "Removed firewall rule for port $portNumber"
            }

            # Verify the port was closed
            if (-not (Test-PortOpen)) {
                Write-Result $true "Port $portNumber has been successfully closed in firewall."
            } else {
                Write-Result $false "Failed to verify that port $portNumber is closed."
            }
        }
    }
} catch {
    Write-Result $false "An error occurred: $_"
    exit 1
}