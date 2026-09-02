"""Workspace validation script for Wise County Title project."""

import os
import sys
import py_compile
from pathlib import Path

def run_checks():
    print("=========================================")
    print("WISE COUNTY TITLE WORKSPACE VERIFICATION")
    print("=========================================\n")
    
    passed = True
    base_dir = Path(__file__).resolve().parent.parent

    # 1. Check anchor file ANTIGRAVITY.md
    anchor = base_dir / "ANTIGRAVITY.md"
    if anchor.exists():
        print(f"[PASS] Project anchor '{anchor.name}' exists.")
    else:
        print(f"[FAIL] Missing '{anchor.name}'!")
        passed = False

    # 2. Check README.md
    readme = base_dir / "README.md"
    if readme.exists():
        print(f"[PASS] Documentation '{readme.name}' exists.")
    else:
        print(f"[FAIL] Missing '{readme.name}'!")
        passed = False

    # 3. Check data directories
    for sub in ["raw", "processed", "exports"]:
        d = base_dir / "data" / sub
        if d.exists():
            print(f"[PASS] Data directory 'data/{sub}' exists.")
        else:
            print(f"[FAIL] Missing 'data/{sub}'!")
            passed = False

    # 4. Check syntax compilation for all Python files in src and scripts
    py_files = list((base_dir / "src").glob("*.py")) + list((base_dir / "scripts").glob("*.py"))
    print(f"\nCompiling {len(py_files)} Python source files...")
    for pf in py_files:
        try:
            py_compile.compile(str(pf), doraise=True)
            print(f"  [PASS] {pf.relative_to(base_dir)}")
        except Exception as e:
            print(f"  [FAIL] {pf.relative_to(base_dir)}: {e}")
            passed = False

    print("\n=========================================")
    if passed:
        print("ALL WORKSPACE VALIDATION CHECKS PASSED!")
        print("=========================================\n")
        return 0
    else:
        print("WORKSPACE VALIDATION FAILED!")
        print("=========================================\n")
        return 1

if __name__ == "__main__":
    sys.exit(run_checks())
