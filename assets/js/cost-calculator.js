$(document).ready(function() {
    // Disable door type if window type is selected and vice versa
    $('#windowType').on('change', function() {
      if ($(this).val()) {
        $('#doorType').prop('disabled', true);
      } else {
        $('#doorType').prop('disabled', false);
      }
      calculateTotalCost(); // Recalculate the cost when the selection changes
    });
  
    $('#doorType').on('change', function() {
      if ($(this).val()) {
        $('#windowType').prop('disabled', true);
      } else {
        $('#windowType').prop('disabled', false);
      }
      calculateTotalCost(); // Recalculate the cost when the selection changes
    });
  
    // Function to calculate and update total cost
    function calculateTotalCost() {
      // Base price for each type of window and door
      var basePrices = {
        casement: 200,    // Example base prices for windows (replace with actual prices)
        doubleHung: 180,
        sliding: 150,
        bay: 250,
        awning: 220,
        picture: 200,
        entry: 300,      // Example base prices for doors (replace with actual prices)
        french: 400,
        patio: 350,
        slidingDoor: 330,
        biFold: 500,
        storm: 250
      };
  
      // Material cost per square inch for each material type
      var materialCosts = {
        vinyl: 0.05,     // Example cost per square inch for vinyl
        wood: 0.08,      // Example cost per square inch for wood
        aluminum: 0.06,  // Example cost per square inch for aluminum
        fiberglass: 0.07,// Example cost per square inch for fiberglass
        composite: 0.09  // Example cost per square inch for composite
      };
  
      // Get selected options
      var windowType = $("#windowType").val();
      var doorType = $("#doorType").val();
      var height = parseInt($("#height").val());
      var width = parseInt($("#width").val());
      var material = $("#material").val();
      var quantity = parseInt($("#quantity").val());
  
      // Ensure height, width, and quantity are valid numbers
      if (isNaN(height) || isNaN(width) || isNaN(quantity) || height <= 0 || width <= 0 || quantity <= 0) {
        $(".cost-total span").text("$0.00");
        return;
      }
  
      // Calculate material cost based on area (height * width) and material type
      var area = height * width;
      var materialCost = materialCosts[material] * area;
  
      // Calculate total base price for windows and doors
      var totalBasePrice = 0;
      
      if (windowType) {
        totalBasePrice += basePrices[windowType] * quantity;
      }
      if (doorType) {
        totalBasePrice += basePrices[doorType] * quantity;
      }
  
      // Calculate total cost including material cost and additional services
      var totalCost = totalBasePrice + materialCost * quantity;
  
      // Add extra costs for selected services
      if ($("#installation-checkbox").prop("checked")) {
        totalCost += 100;  // Example cost for installation
      }
      if ($("#removal-checkbox").prop("checked")) {
        totalCost += 50;   // Example cost for removal of old
      }
      if ($("#customization-checkbox").prop("checked")) {
        totalCost += 75;   // Example cost for customization
      }
  
      // Update total cost display
      $(".cost-total span").text("$" + totalCost.toFixed(2));
    }
  
    // Call calculateTotalCost function on input change
    $(".calculator-form input, .calculator-form select").on("change", calculateTotalCost);
  });
  