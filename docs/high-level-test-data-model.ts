// --- Enums ---
enum TestStatementType {
  Assignment = "assignment",
  Call = "call",
  Condition = "condition",
  Loop = "loop",
  ExceptionHandling = "exceptionHandling",
  ExceptionThrowing = "exceptionThrowing",
  Other = "other",
}

enum TestEventType {
  Assert = "assert",
  Print = "print",
  Sleep = "sleep",
  Unknown = "unknown",
}

// --- Entities ---
interface TestSuite {
  filePath?: string;             // Path to the test file
  name: string;                  // Suite name
  isExclusive: boolean;          // Only this suite runs
  isIgnored: boolean;            // Suite is skipped
  tests: Test[];                 // 1..* Tests
}

interface Test {
  name: string;                  // Test name
  isExclusive: boolean;          // Only this test runs
  isIgnored: boolean;            // Test is skipped
  startLine: number;             // Source start line
  endLine: number;               // Source end line
  startColumn: number;           // Source start column
  endColumn: number;             // Source end column
  statements: TestStatement[];   // 0..* statements
  events: TestEvent[];           // 0..* events
  asserts: TestAssert[];         // 0..* assertions
}

interface TestStatement {
  type: TestStatementType;       // Statement type
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

interface TestEvent {
  name: string;                  // Event name
  type: TestEventType;           // Event type
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

interface TestAssert {
  matcher: string;               // Assertion matcher
  literalExpected?: string;      // Optional expected literal
  literalActual?: string;        // Optional actual literal
  message?: string;              // Optional assertion message
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}
