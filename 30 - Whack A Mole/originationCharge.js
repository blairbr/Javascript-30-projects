		$("#OriginationChargeRequestedValue").change(function() {
			if (parseFloatEnhanced($(this).val()) == parseFloatEnhanced($("#OriginationFee").val())) {
				$("#OriginationChargeRequestedValue, #OriginationChargeRequestedPercentage").addClass('origination-fee-alert-border');
				$(this).val(0);
				$("#OriginationChargeRequestedPercentage").val(0);
                $("#originationChargeDecreaseNote").hide();
			} else {
				var requestedValuePercentage = (parseFloat($('#OriginationChargeRequestedValue').val()) / (parseFloat(@Model.TotalLoanAmt)) * 100).toFixed(4);
				if (isNaN(requestedValuePercentage)) {
					requestedValuePercentage = 0;
				}
				$('#OriginationChargeRequestedPercentage').val(requestedValuePercentage);
				$("#OriginationChargeRequestedValue, #OriginationChargeRequestedPercentage").removeClass('origination-fee-alert-border');
				if (parseFloatEnhanced($(this).val()) > parseFloatEnhanced($("#OriginationFee").val())) {
                    $("#originationChargeDecreaseNote").hide();
                }
				if (parseFloatEnhanced($(this).val()) < parseFloatEnhanced($("#OriginationFee").val())) {

                    $("#originationChargeDecreaseNote").show();
                }
            }
            RequestedValueMask('#' + $(this).attr("id"), 2);
			if ((parseFloatEnhanced($(this).val()) > parseFloatEnhanced($("#OriginationFee").val())) && (($('#LoanAmount').prop('checked') == false) || (parseFloatEnhanced($("#LoanAmountRequestedValue").val()) <= parseFloatEnhanced($("#LoanAmountCurrentValue").val())))) {
                $("#originationChargeRowNote").show();
            } else {
                $("#originationChargeRowNote").hide();
            }
            if (parseFloatEnhanced($(this).val()) == 0) {
                $("#originationChargeDecreaseNote").hide();
			}
            ShowSaveChanges();
		});

		$('#OriginationChargeRequestedPercentage').change(function () {
			var originationFeePercentage = parseFloat($('#OriginationChargeRequestedPercentage').val());
			var originationFeeRequestedValue = ((originationFeePercentage * @Model.TotalLoanAmt)/ 100).toFixed(2);
			if (isNaN(originationFeePercentage)) {
				originationFeeRequestedValue = 0;
			}
			$('#OriginationChargeRequestedValue').val(originationFeeRequestedValue);
			$('#OriginationChargeRequestedValue').trigger('change');
		});

		$('#OriginationChargeRequestedValue, #OriginationChargeRequestedPercentage').keypress(function (e) {
			if (isNaN(this.value + "" + String.fromCharCode(e.charCode))) {
				return false;
			}
		});