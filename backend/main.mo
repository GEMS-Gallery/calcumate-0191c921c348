import Text "mo:base/Text";

import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
  public func calculate(operation: Text, x: Float, y: Float) : async Float {
    switch (operation) {
      case ("+") { return x + y; };
      case ("-") { return x - y; };
      case ("*") { return x * y; };
      case ("/") {
        if (y == 0) {
          Debug.trap("Division by zero");
        };
        return x / y;
      };
      case (_) {
        Debug.trap("Invalid operation");
      };
    };
  };
}